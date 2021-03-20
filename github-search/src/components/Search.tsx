import React, { useState } from 'react';
import logo from '../github.webp';
import './Search.css';
import { useDispatch } from 'react-redux'
import { debounce } from "lodash";
import { getData, setLoading } from '../store/actions/dataActions';
import { setType } from '../store/actions/typeAction';

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState<string>('');
    const [type, set_Type] = useState<string>('');

    const searchDispatch = (object: Object) => {
        dispatch(setLoading());
        dispatch(getData(object));
    }
    const changeHandler = debounce((text: string) => {
        setText(text);
        if (text.length >= 3) {
            searchDispatch({ text, type })
        }
        else if (text.length < 3) {
            dispatch(getData([]));
            dispatch(setType(type))
        }
    }, 20)
    const handleType = debounce((option: string) => {
        set_Type(option);

        dispatch(setType(option))
        if (text.length >= 3) {
            searchDispatch({ text, type })

        }
        else if (text.length < 3) {
            dispatch(getData([]));

        }

    }, 1000)
    return (
        <div className="wrapper">
            <div className="container2">
                <div className="topDiv">
                    <div className="App-logo"><img src={logo} className="logo" alt="logo" /></div>
                    <div className="titleDiv">
                        <h2 id="title"> Github Searcher</h2>
                        <p id="description"> Search user or repositories below</p>
                    </div>
                </div>
                <div className="inputs">
                    <input id="input" value={text} type='text' placeholder="Start typing to search.." onChange={e => changeHandler(e.target.value)} />

                    <select id="dropdown" value={type} onChange={e => handleType(e.target.value)} >
                        <option value="users">Users</option>
                        <option value="repositories">Repositories</option>

                    </select>


                </div>
            </div>
        </div>
    );
}

export default Search;