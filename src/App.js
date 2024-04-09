import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {

    const [users, setUsers] = React.useState([]);
    const [invited, setInvited] = React.useState([]);
    const [searchUser, setSearchUser] = React.useState('');
    const [sendInvites, setSendInvites] = React.useState(false);

    React.useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(res => res.json())
            .then(json => {
                setUsers(json.data)
            })
            .catch(err => {
                console.warn(err);
            })
    })

    const onChangeSearchUser = (e) => {
        setSearchUser(e.target.value);
    }

    const onClickInveted = (id) => {
        if (invited.includes(id)) {
            setInvited(prev => prev.filter(_id => _id !== id));
        } else {
            setInvited(prev => [...prev, id])
        }
    }

    const onClickSendInvites = () => {
        if (invited.length !== 0) {
            setSendInvites(!sendInvites);
        }
    }

    return (

        <div className="App">
            {sendInvites ? <Success onClickSendInvites={onClickSendInvites} count={invited.length} /> : (
                <Users
                    items={users}
                    onChangeSearchUser={onChangeSearchUser}
                    searchUser={searchUser}
                    onClickInveted={onClickInveted}
                    invited={invited}
                    onClickSendInvites={onClickSendInvites} />
            )}
        </div>
    );
}

export default App;
