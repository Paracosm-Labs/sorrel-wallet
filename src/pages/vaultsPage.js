import React from 'react';
import VaultAccordian from '../components/vaultAccordian';
import AccountBalance from '../components/accountBalance';
import Navigation from '../components/navMenu';

const VaultsPage = () => {
  return (
    <div className="text-center vaults">
      <Navigation></Navigation>
      <AccountBalance></AccountBalance>
      <VaultAccordian></VaultAccordian>

    </div>
  );
};

export default VaultsPage;
