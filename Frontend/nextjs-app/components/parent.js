import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faHouse, } from '@fortawesome/free-solid-svg-icons'

function Parent ({children}) {
    return ()
        <div>
<aside>
<div className= 'flex flex-row space-x-3 place-items-center'>
<FontAwesomeIcon style ={{ height:40, width: 40,}}
icon={faHouse} size='2xs' color='white' />
<a>Home</a>
</div>
<div className= 'flex flex-row space-x-3 place-items-center'>
<FontAwesomeIcon style ={{ height:40, width: 40,}}
icon={faHouse} size='2xs' color='white' />
<a>POS</a>
</div>
<div className= 'flex flex-row space-x-3 place-items-center'>
<FontAwesomeIcon style ={{ height:40, width: 40,}}
icon={faHouse} size='2xs' color='white' />
<a>Sales</a>
</div>
<div className= 'flex flex-row space-x-3 place-items-center'>
<FontAwesomeIcon style ={{ height:40, width: 40,}}
icon={faHouse} size='2xs' color='white' />
<a>Brands</a>
</div>
<div className= 'flex flex-row space-x-3 place-items-center'>
<FontAwesomeIcon style ={{ height:40, width: 40,}}
icon={faHouse} size='2xs' color='white' />
<a>Collections</a>
</div>
</aside>
        </div>
        <div className = 'm1-74 p-12 pt-16'>
        </div>
  
}
export default Parent