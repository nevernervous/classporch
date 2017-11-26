
import React, {Component} from 'react'
import { Grid, Header, Divider, Image, Input } from 'semantic-ui-react'

// class SearchBar extends Component {

//     render(){
//         return(
//             <Input size='large' placeholder='Search for tutors,skills you want to learn...' action='Search'  className='search-input' />
//         )
//     }
// }

const SearchBar = () => {
    return(
        <div style={{flex:1}}>
        <Input size='large' placeholder='Search for tutors,skills you want to learn...' action='Search'  className='search-input' />
        </div>
    )
}

export default SearchBar