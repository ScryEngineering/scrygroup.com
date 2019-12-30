import React from 'react'

import styles from "./Masthead.module.scss";

const Header = (props) => (
  <div className={styles.wrapper}>
    <div className={"masthead "+styles.masthead}>
      <h1>{props.heading}</h1>
      {props.paragraph && <p>{props.paragraph}</p>}
    </div>
  </div>
)

export default Header
