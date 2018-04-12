import React, {Component} from 'react';

class Header extends Component {

    render() {
        return(
            <div>
                <div className="row">
                    <div className="medium-3 large-4 small-3 logo column">
                        <a href="/qatrah-web-html" title="Qatrah">
                            <img src="public/images/logo-main.png"/>
                        </a>
                    </div>
                    <div className="medium-9 large-8 small-9 column text-right">
                        <a href="#mobile_menu" className="menu-icon"><span></span></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
