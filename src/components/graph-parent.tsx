import  { useEffect, useRef, useState } from 'react';
import { User } from '../pages/types';
import MultiLineGraph from './mult';


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
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showDropdown3, setShowDropdown3] = useState(false);
    const [showDropdown4, setShowDropdown4] = useState(false);
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

    
    
    const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredResults = top100Cryptos.filter(crypto => crypto.toLowerCase().includes(term.toLowerCase()));
        setSearchResults(filteredResults);
        setShowDropdown1(true);
    };
    const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredResults = top100Cryptos.filter(crypto => crypto.toLowerCase().includes(term.toLowerCase()));
        setSearchResults(filteredResults);
        setShowDropdown2(true);
    };
    const handleInputChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredResults = top100Cryptos.filter(crypto => crypto.toLowerCase().includes(term.toLowerCase()));
        setSearchResults(filteredResults);
        setShowDropdown3(true);
    };
    const handleInputChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredResults = top100Cryptos.filter(crypto => crypto.toLowerCase().includes(term.toLowerCase()));
        setSearchResults(filteredResults);
        setShowDropdown4(true);
    };
    
    const handleSelection = (crypto: string, line:string) => {
        if (line === 'red') {
            setRed(crypto);
            create(crypto,blue,green,yellow)
        }
        else if (line === 'blue') {
            setBlue(crypto);
            create(red,crypto,green,yellow)
        }
        else if (line === 'green') {
            setGreen(crypto);
            create(red,blue,crypto,yellow)
        }
        else { setYellow(crypto);
            create(red,blue,green,crypto)}
        
        setSearchTerm('');
        setSearchResults([]);
        setShowDropdown1(false);
        setShowDropdown2(false);
        setShowDropdown3(false);
        setShowDropdown4(false);
        setTimeout(() => {window.location.reload()}, 3000);

    };
    
    const create = async (red: string,blue: string,green: string,yellow: string) => {
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

  useEffect(() => {
    const hammer = () => {
      if (grafBoxRef.current) {
        const box = grafBoxRef.current.getBoundingClientRect();
        if (box.height === 0) {
          window.location.reload();
          console.log("true")
        };
      }
    };
    hammer();
  });

  return (
    <div>
        <div className='search-grid inter_font'>
            <div className='inter-font search-bar'>
                <input
                    className='sign-log-input inter-font search-bar-input'
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange1}
                    placeholder="Change red line"
                    onBlur={() => setTimeout(() => setShowDropdown1(false), 200)}
                />
                {showDropdown1 && searchResults.length > 0 && (
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
                    onChange={handleInputChange2}
                    placeholder="Change blue line"
                    onBlur={() => setTimeout(() => setShowDropdown2(false), 200)}
                />
                {showDropdown2 && searchResults.length > 0 && (
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
                    onChange={handleInputChange3}
                    placeholder="Change green line"
                    onBlur={() => setTimeout(() => setShowDropdown3(false), 200)}
                />
                {showDropdown3 && searchResults.length > 0 && (
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
                    onChange={handleInputChange4}
                    placeholder="Change yellow line"
                    onBlur={() => setTimeout(() => setShowDropdown4(false), 200)}
                />
                {showDropdown4 && searchResults.length > 0 && (
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
            <MultiLineGraph 
                width={width} 
                height={height} 
                user = {props.user}
                    />
                </div>
    </div>
  );
};

export default ParentComponent;
