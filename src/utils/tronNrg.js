// tronNrg.js
import { useContext } from 'react';
import { TronWebContext } from '../context/tronWebContext';

const NRG_CONTRACT_ADDRESS = 'TEeLFcbSc2LFSFrTZnWRCacZzo3ZtBybh2';

export function useEnergyUtils() {
    const { tronWeb } = useContext(TronWebContext);

    async function getNRGContract() {
        return await tronWeb.contract().at(NRG_CONTRACT_ADDRESS);
    }

    async function getAvailableEnergy() {
        const NRG = await getNRGContract();
        let getDelegatableResource = await NRG.getDelegatableResource(1).call();
        getDelegatableResource = parseInt(getDelegatableResource._hex, 16);
        let energyInfo = await NRG.energyInfo().call();
        energyInfo = parseInt(energyInfo.amountScheduledOut._hex, 16);
        let rate = await NRG.getCurrentEnegryRate().call();
        rate = parseInt(rate._hex, 16);
        let energyAvailableNow = Math.floor((getDelegatableResource - energyInfo) / 1000000) * rate;
        return energyAvailableNow;
    }

    async function rentEnergy(delegateTo, unitType, energyAmount, rentalPeriod, affiliate) {
        const NRG = await getNRGContract();
        var availableEnergy = await getAvailableEnergy();
        if (availableEnergy >= energyAmount) {
            var calculatePriceResult = await NRG.calculatePrice(unitType, energyAmount, rentalPeriod).call();
            var quote = parseInt(calculatePriceResult.total._hex);
            var buyEnergyResult = await NRG.buyEnergy(delegateTo, unitType, energyAmount, affiliate, rentalPeriod).send({
                feeLimit: tronWeb.toSun('400'),
                callValue: quote,
                shouldPollResponse: false
            });
            return true;
        } else {
            return false;
        }
    }

    return { getAvailableEnergy, rentEnergy };
}