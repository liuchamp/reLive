// import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

import { Button } from 'antd';
import styles from './layout.module.less';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {

};

// const defaultProps = {};

/**
 * 
 */
const HeaderRigthContext = () => {
    return <div className={styles.right}>
        <Button type="link">Sign in</Button>
        <Button type="primary" size="large" >
        Sign up for free
        </Button>
    </div>;
}

HeaderRigthContext.propTypes = propTypes;
// HeaderRigthContext.defaultProps = defaultProps;
// #endregion

export default HeaderRigthContext;