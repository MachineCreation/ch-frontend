import  {useRef, useState, useEffect } from 'react';
import { User } from '../pages/types';
import MultiLineGraph from './mult';
import axios from 'axios';
import SearchBar from './searchbar';
import DailyGraph from './daygraph';


interface ParentComponentProps {
    user: User;
}

interface Currency {
    code: string;
}


const ParentComponent= (props: ParentComponentProps) => {

    const grafBoxRef = useRef<HTMLDivElement>(null);

    const [cryptoList, setCryptoList] = useState<string[]>([]);


    // call list of currently supported coins
    useEffect(() => {
        const fetchCryptoList = async () => {
            try {
                const response = await axios.get('https://api.coinbase.com/v2/currencies/crypto');
                const currencies: Currency[] = response.data.data;
                setCryptoList(currencies.map((currency: Currency) => currency.code));
                console.log(cryptoList)
            } catch (error) {
                console.error("There was an error fetching the cryptocurrency data:", error);
            }
        };
        fetchCryptoList();
    }, []);

  return (
    <div>
        <div className='search-grid inter_font'>
            <SearchBar
                clist={cryptoList}
                lineColor='red'
                cryptoChoice= {props.user.red}
                />
            <SearchBar
                clist={cryptoList}
                lineColor='blue'
                cryptoChoice= {props.user.blue}
                />
            <SearchBar
                clist={cryptoList}
                lineColor='green'
                cryptoChoice= {props.user.green}
                />
            <SearchBar
                clist={cryptoList}
                lineColor='yellow'
                cryptoChoice= {props.user.yellow}
                />
            
        </div>
        <div ref={grafBoxRef} id="graf-box">
            <MultiLineGraph 
                user = {props.user}
                    />
            <div className="day-chart-parent">
                <DailyGraph
                    crypto= {props.user.red}
                    color= 'red'
                    />
                <DailyGraph
                    crypto= {props.user.blue}
                    color= 'blue'
                    />
                <DailyGraph
                    crypto= {props.user.green}
                    color= 'green'
                    />
                <DailyGraph
                    crypto= {props.user.yellow}
                    color= 'yellow'
                    />
            </div>
        </div>
        
    </div>
  );
};

export default ParentComponent;
