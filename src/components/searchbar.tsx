import  { useState } from 'react';

interface searchBarProps {
    clist: string[];
    lineColor: string;
    cryptoChoice: string;
}

function SearchBar(props: searchBarProps) {
    // variables
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const token = localStorage.getItem('token');

    // search bar logic
    // change user searchbar choice
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredResults = props.clist.filter(crypto => crypto.toLowerCase().includes(term.toLowerCase()));
        setSearchResults(filteredResults);
        setShowDropdown(true);
    };

    // change search bar selection

    const handleSelection = (crypto: string) => {

        create(crypto, props.lineColor);
        setSearchTerm('');
        setSearchResults([]);
        setShowDropdown(false);
        setTimeout(() => {window.location.reload()}, 1000);

    };

    // push new selection to db

    const create = async (crypto: string, color: string) => {
        const response = await fetch(`https://chbackend-psu2.onrender.com/${color}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify({[color]: crypto})
        })
        
        if (!response.ok) {
            throw new Error('Failed to update data on the server');
        };
        return await response.json()
    }
    
    // search bar render
    return (
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
                            onClick={() => handleSelection(result)}>
                                {result}
                                </li>
                        ))}
                    </ul>
                )}
                <p className='t-white' style={{margin: 'auto'}}>Selected Crypto: <span style={{color:`${props.lineColor}`}}>{props.cryptoChoice}</span></p>
            </div>
    )
};

export default SearchBar