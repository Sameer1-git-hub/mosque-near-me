// Header.js
import React from 'react';
import Logo from '../components/Logo';
import BodySection from '../components/BodySection';

const Header = () => {
  return (
    <View style={styles.headerTabView}>
      <Logo />
      <BodySection />
    </View>
  );
};

export default Header;
