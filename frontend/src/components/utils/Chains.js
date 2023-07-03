const getNetworkName = (chainId) => {
    return getNetWorkList().find(network => network.id === chainId).name
}

const getCoinList = () => {
    return [
        'bnb',
        // 'avax',
        // 'ftm',
        'eth',
        'matic',
        'c4ei'
    ]
}

const getCoinLogo = (coin) => {
    const baseApi = 'https://cryptologos.cc/logos'
    return {
        bnb: `${baseApi}/bnb-bnb-logo.png`,
        // avax: `${baseApi}/avalanche-avax-logo.png`,
        eth: `${baseApi}/ethereum-eth-logo.png`,
        matic: `${baseApi}/polygon-matic-logo.png`,
        // ftm: `${baseApi}/fantom-ftm-logo.png`,
        c4ei: `https://cex.c4ei.net/c4ei-logo.png`
    }[coin.toLowerCase()]
}

const getDefaultCoin = () => {
    return getCoinList()[0]
}

const getNetWorkList = (coin) => {
    const networks = [
        {
            id: 21004,
            name: 'C4EI Chain',
            abbr: 'c4ei',
            coin: 'c4ei',
            explorerBase: 'https://exp.c4ei.net/tx/'
        },
        {
            id: 56,
            name: 'Binance Smart Chain',
            abbr: 'bsc',
            coin: 'bnb',
            explorerBase: 'https://bscscan.com/tx/'
        },
        {
            id: 1,
            name: 'Ethereum',
            abbr: 'ethereum',
            coin: 'eth',
            explorerBase: 'https://etherscan.io/tx/'
        },
        {
            id: 4002,
            name: 'Fantom',
            abbr: 'fantom',
            coin: 'ftm',
            explorerBase: 'https://testnet.ftmscan.com/tx/'
        },
        {
            id: 43113,
            name: 'Avalanche',
            abbr: 'avalanche',
            coin: 'avax',
            explorerBase: 'https://testnet.snowtrace.io/tx/'
        },
        {
            id: 137,
            name: 'Polygon',
            abbr: 'polygon',
            coin: 'matic',
            explorerBase: 'https://mumbai.polygonscan.com/tx/'
        }
    ]

    return coin ?
        networks.filter(network => network.coin === coin.toLowerCase())
        : networks
}

const getDefaultNetworkId = (coin) => {
    return {
        c4ei: 21004,
        bnb: 56,
        avax: 43113,
        eth: 1,
        ftm: 4002,
        matic: 137
    }[coin.toLowerCase()]
}

const getNetworkExplorerBase = (chainId) => {
    return getNetWorkList().find(network => network.id === chainId).explorerBase
}

const getCoinFee = (coin) => {
    switch (coin.toUpperCase()) {
        case 'BNB': return 0.005;
        case 'AVAX': return 0.1;
        case 'ETH': return 0.005;
        case 'MATIC': return 0.1;
        case 'FTM': return 0.5;
        case 'C4EI': return 0.2;
    }
}

const getCoinDecimalsPlace = (coin) => {
    switch (coin.toUpperCase()) {
        case 'BNB': return 8;
        case 'AVAX': return 4;
        case 'ETH': return 8;
        case 'MATIC': return 2;
        case 'FTM': return 2;
        case 'C4EI': return 8;
    }

    return 8;
}

export {
    getNetworkName,
    getCoinFee,
    getNetworkExplorerBase,
    getNetWorkList,
    getDefaultNetworkId,
    getCoinList,
    getDefaultCoin,
    getCoinLogo,
    getCoinDecimalsPlace
}