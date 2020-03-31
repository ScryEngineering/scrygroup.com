---
Title: "Stringly typed functions"
Date: "2020-03-28"
Tags: 
    - "software-engineering"
    - "type-systems"
    - "septic-code"
    - "legacy-systems"
    - "legacy-rescue"
    - "antipatterns"
    - "stringly-typed"
    - "legacy-rescue"
Authors:
    - "Janis Lesinskis"
contentType: "blog"
---

Over my career I've done a lot of work with distressed systems, these are the sorts of projects that have such substantial issues with the code base that the business value is limited due to the implementation. There's one type of antipattern that I notice has a strong tendency to turn into [septic code](https://brucefwebster.com/2013/09/12/septic-code-why-some-large-it-projects-never-go-into-production/), given enough time and change, which is the "stringly typed" system.

Here's an example in Python, but this can pretty easily come up in any language:

```python
# utils.py
def td_fastload(df, tablename, index="", force_data_type={'month_key':'VARCHAR(6)'},
                copy_df='n',system='tdp5',buffer=10,buffer_charvar=0,username='',
                password='', drop_existing_td='y',drop_err_files='y',del_csv='y',
                search_rows=20000,print_time='N',checkpoint_rows=10000 ):
```

There's a lot of things that are bad about the way this function is engineered, but I only want to focus on the usage of string literals for the default values.
`del_csv`, `copy_df` and `drop_existing_td` are all booleans at this moment in time but are represented as strings, this can somewhat work but is fragile and doesn't have to be this way.

## Step zero - should this code even exist at all?

Before I dig into how I'd try to improve something like this I think there's a far more important question to ask. Whenever I see code to interact with the internals of database systems I always start by asking if the code should be written *at all*. There's many good database libraries that handle all sorts of [edge cases]({filename}/software_engineering_posts/tutorials/sqlalchemy_sqlite_foreign_keys.md) that the average user has never even heard of. Even if you know all the various quirks of the databases you most likely aren't getting paid to write a database library so looking for libraries that handle this is probably a good first step.

If you do know for a fact that you weill gain value from writing a database engine or contributing to an open source DB project because the existing solutions out there don't cover your needs, go for it, you know who you are.

## Lack of type safety

When you use string types for all values you lose a substantial amount of type safety. This means that the language itself is now unable to prevent a whole category of problems from arising.

Consider this:

```python
results1 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, 'y', 10, 'system10')
results2 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, 10, 'y', 'system10')
results3 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, 'system10', 10, 'y')
```

Which of these is invalid? Which of these will crash in production? Which will silently pollute the state of your database?
Also note how we had to include an empty string for the index and `{'month_key':'VARCHAR(6)'},` as positional arguments even though we just wanted to use the default values for both of these, but more about fixing this annoyance later...

Without *very carefully* looking at the body of the function it's actually impossible to know what will happen here.

Due to the way in which this function is implemented *Python's type system is not able to tell you that you made a mistake*, in order to see a problem you have to run the code and have it crash or worse not crash and silently fail to do what you want.

If we used type annotations and distinct types here we would be able to prevent a large class of problems from being possible at all. By using tooling such as mypy we would immediately be informed that we made a mistake. Life is much easier for the library *user* if we can let them use this sort of tooling:

```python
results1 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, True, 10, 'system10')
results2 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, 10, True, 'system10')
results3 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, 'system10', 10, True)
```

Now in this case our automated tooling would catch the bad function calls for us, no chance of this causing crashes in production or data corruption.

## Using more constrained types

The reason that the code above is so dangerous is because a string data type can take a whole range of values, including invalid ones.

By using a more appropriate data type like an [enumeration](https://en.wikipedia.org/wiki/Enumerated_type) or, in more complex cases, using a finite state machine a benefit you get is entirely removing the possibility of supplying an argument that is of the correct type but is a bogus value. By removing entire failure modes your code becomes substantially more robust.

## Optional and default values

There's a bunch of issues that come up with these sorts of function signatures if you have optional positional arguments.

Once again using the example from before:

```python
results1 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, 'y', 10, 'system10')
results2 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, 10, 'y', 'system10')
results3 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, 'system10', 10, 'y')
```

In this situation we didn't actually care about changing `force_data_type` from it's default value, but we have to provide it anyway and we encode the default value at the time when we wrote the call site code. Really this is bad, because want `force_data_type` to just be whatever the default value is, but we are forced to provide it as a positional argument just to support setting the later parameters as something non-default. In the future this default value might change to say fix a bug or make an improvement, but our calling site has encoded the old obsolete value into the source code. So in the future we can't know if the old code wanted to use the default value or was supplying it as something it needed. This approach also robs us of the ability to actually deprecate an old default in the proper way as well.

Thankfully we have a way that we can structure this function such that those other problems go away entirely.
The best thing to do in a situation like this is to force all optional arguments to be provided as keyword only.

```python
def td_fastload(df, tablename, *, index="", force_data_type={'month_key':'VARCHAR(6)'},
                copy_df='n',system='tdp5',buffer=10,buffer_charvar=0,username='',
                password='', drop_existing_td='y',drop_err_files='y',del_csv='y',
                search_rows=20000,print_time='N',checkpoint_rows=10000 ):
```

So instead of:

```python
results1 = td_fastload(data, "example_table", "", {'month_key':'VARCHAR(6)'}, 'y', 10, 'system10')
```

We now have:

```python
results1 = td_fastload(data, "example_table", copy_df='y', buffer=10, system='system10')
```

We get rid of the whole problem of having to fill in the intermediate positional arguments with default values. We also get rid of that annoying task of trying to remember which order the various parameters come up in and we can just get on with solving our problems.

Also from an ergonomics point of view it's far easier to use this, for example now if you wanted to specify only `checkpoint_rows` and leave everything else as the default it's super easy:

```python
results1 = td_fastload(data, "example_table", checkpoint_rows=1234)
```

By forcing all the optional arguments to be provided only as keyword arguments we prevent a lot of mistakes from being possible at all with regards to the ordering of parameters. We also get a lot more flexibility since we can add in new parameters whenever we wanted, previously with positional arguments if we wanted a new parameter our only choice is to put it at the end if we don't want to break existing code.

With the old implementation, it would be impossible to semantically capture the notion of "I'd like to call this td_fastload function with all the values being the default values except for checkpoint_rows" without jumping through a bunch of very esoteric hoops that honestly you shouldn't have to ever jump through. Those hoops would make for a great follow up post, but seeing as it's so absurd it's far better to just to suggest that people structure their code to not have to do this by using keyword arguments.

## Default values that can be the same as a valid value

Let's say inside the implementation of `td_fastload` we needed to know if `system` was supplied by the user or was the default value.
We can't reliably do that at the moment because the following two calls will look identical to the `td_fastload` function:

```python
results1 = td_fastload(data, "example_table")
results2 = td_fastload(data, "example_table", system='tdp5')
```

Say you want to be able to distinguish between those two calls, the idea here is that you make the default value not the the same type as what the users supply.
This is where the idiom of using `None` for a default value comes in. Consider this change:

```python
DEFAULT_SYSTEM = 'tdp5'
def td_fastload(df, tablename, *, index="", force_data_type={'month_key':'VARCHAR(6)'},
                copy_df='n',system=None,buffer=10,buffer_charvar=0,username='',
                password='', drop_existing_td='y',drop_err_files='y',del_csv='y',
                search_rows=20000,print_time='N',checkpoint_rows=10000 ):
    if system is None:
        print("Using default for system")
        system = DEFAULT_SYSTEM
    else:
        print("User supplied system:", system)
```

Now we are able to determine if the user specified this parameter or not.
(Note that if `None` is also a valid value then you'd need to use a sentinel object to ensure this default parameter couldn't possibly be a valid user supplied value)

If for some reason you had some compelling reason to keep the function signature there's might be some other ways in which you achieve this but it will be nasty, and really would be best covered in another post.
