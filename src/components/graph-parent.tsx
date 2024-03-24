import  { useEffect, useRef, useState } from 'react';
import LineGraph from './graph';
import { User } from '../pages/types';


interface ParentComponentProps {
    user: User;
}


const ParentComponent= (props: ParentComponentProps) => {
    const grafBoxRef = useRef<HTMLDivElement>(null); 
    const [width, setWidth] = useState(0); 
    const [height, setHeight] = useState(0); 
    const [red, setRed] = useState(props.user.red);
    const [blue, setBlue] = useState(props.user.blue);
    const [green, setGreen] =useState(props.user.green);
    const [yellow, setYellow] = useState(props.user.yellow);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const token = localStorage.getItem('token');

    const top100Cryptos = [
        "BTC", "ETH", "BNB", "USDT", "ADA", "DOT", "XRP", "UNI", "LTC", "LINK",
        "BCH", "THETA", "XLM", "DOGE", "USDC", "VET", "TRX", "EOS", "FIL", "AAVE",
        "MKR", "ATOM", "XTZ", "SOL", "CRO", "BUSD", "DASH", "NEO", "KSM", "HT",
        "COMP", "LEO", "SNX", "HBAR", "WBTC", "CEL", "ICX", "YFI", "EGLD", "XMR",
        "FTT", "UMA", "MIOTA", "NANO", "GRT", "REN", "ZEC", "ZIL", "SUSHI", "ONT",
        "CHZ", "CAKE", "BTT", "ENJ", "BAT", "MANA", "RVN", "DGB", "HOT", "LSK",
        "ZRX", "THETA", "QTUM", "YFI", "DENT", "SC", "HBAR", "VET", "NEAR", "KCS",
        "WAVES", "BTG", "LRC", "ETC", "SXP", "ICP", "IOST", "RSR", "XVG", "ALGO",
        "ONT", "HNT", "BTMX", "FTM", "AR", "ZEN", "KAVA", "ANT", "OCEAN", "CELO"
        ];

    
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredResults = top100Cryptos.filter(crypto => crypto.toLowerCase().includes(term.toLowerCase()));
        setSearchResults(filteredResults);
        setShowDropdown(true);
    };
    
    const handleSelection = (crypto: string, line:string) => {
        if (line === 'red') {
            setRed(crypto);
        }
        else if (line === 'blue') {
            setBlue(crypto);
        }
        else if (line === 'green') {
            setGreen(crypto);
        }
        else { setYellow(crypto);}
        
        setSearchTerm('');
        setSearchResults([]);
        setShowDropdown(false);
        create();

    };
    
    const create = async () => {
        const response = await fetch(`https://chbackend-psu2.onrender.com/create`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify({'red': red, 'blue': blue, 'green': green, 'yellow': yellow})
        })
        
        if (!response.ok) {
            throw new Error('Failed to update data on the server');
        };
        return await response.json()
    }

    useEffect(() => {
    const handleResize = () => {
      if (grafBoxRef.current) {
        const box = grafBoxRef.current.getBoundingClientRect();
        setWidth(box.width);
        setHeight(box.height);
      }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  return (
    <div>
        <div className='search-grid inter_font'>
            <div className='inter-font search-bar'>
                <input
                    className='sign-log-input inter-font search-bar-input'
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Change red line"
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                {showDropdown && searchResults.length > 0 && (
                    <ul className='search-list'>
                        {searchResults.map((result, index) => (
                            <li 
                            className='search-list-items'
                            key={index} 
                            onClick={() => handleSelection(result, 'red')}>
                                {result}
                                </li>
                        ))}
                    </ul>
                )}
                <p className='t-white' style={{margin: 'auto',}}>Selected Crypto: <span id='red'>{red}</span></p>
            </div>
            <div className='inter-font search-bar'>
                <input
                    className='sign-log-input inter-font search-bar-input'
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Change blue line"
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                {showDropdown && searchResults.length > 0 && (
                    <ul className='search-list'>
                        {searchResults.map((result, index) => (
                            <li 
                            className='search-list-items'
                            key={index} 
                            onClick={() => handleSelection(result, 'blue')}>
                                {result}
                                </li>
                        ))}
                    </ul>
                )}
                <p className='t-white' style={{margin: 'auto',}}>Selected Crypto: <span id='blue'>{blue}</span></p>
            </div>
            <div className='inter-font search-bar'>
                <input
                    className='sign-log-input inter-font search-bar-input'
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Change green line"
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                {showDropdown && searchResults.length > 0 && (
                    <ul className='search-list'>
                        {searchResults.map((result, index) => (
                            <li 
                            className='search-list-items'
                            key={index} 
                            onClick={() => handleSelection(result, 'green')}>
                                {result}
                                </li>
                        ))}
                    </ul>
                )}
                <p className='t-white' style={{margin: 'auto',}}>Selected Crypto: <span id='green'>{green}</span></p>
            </div>
            <div className='inter-font search-bar'>
                <input
                    className='sign-log-input inter-font search-bar-input'
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Change yellow line"
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                {showDropdown && searchResults.length > 0 && (
                    <ul className='search-list'>
                        {searchResults.map((result, index) => (
                            <li 
                            className='search-list-items'
                            key={index} 
                            onClick={() => handleSelection(result, 'yellow')}>
                                {result}
                                </li>
                        ))}
                    </ul>
                )}
                <p className='t-white' style={{margin: 'auto',}}>Selected Crypto: <span id='yellow'>{yellow}</span></p>
            </div>
        </div>
        <div ref={grafBoxRef} className="graf-box">
            <LineGraph 
                width={width} 
                height={height} 
                user = {props.user}
                    />
                </div>
    </div>
  );
};

export default ParentComponent;
