import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import repo from '../repo.png';
import './list.css';
interface Listprops {
    data: any
}

const List: React.FC<Listprops> = ({ data }) => {

    const type = useSelector((state: RootState) => state.type.type);
    console.log(type, 'type')
    return (
        <div className="grid-container">

            {data.length && type ?
                data.map((el: any, i: any) => {
                    if (type === 'users') {
                        return <div key={i} className="grid-item">
                            <img className="image" src={el.avatar_url} alt={el.login} />
                            <div className="userInfo">
                                <h3> Username : {el.login}</h3>
                                <p>ID : {el.id}</p>
                                <a href={el.html_url} target="_blank" rel="noreferrer"><button>visit Profile</button></a>
                            </div>
                        </div>
                    }
                    else if (type === 'repositories') {
                        return <div key={i} className="grid-item">

                            <div className="userInfo">
                                <img className="repo" src={repo} alt={el.name} />
                                <h3> Name : {el.name}</h3>
                                {el.description ? <p>Description : {el.description}</p> : null}

                                {el.language ? <p>Language : {el.language}</p> : null}
                                <p>Forks :{el.forks} </p>

                                <div className="flexOwner">

                                    <img className="Smallimage" src={el.owner.avatar_url} alt={el.owner.login} />
                                    <h6>Owner : {el.owner.login}</h6>
                                </div>
                                <p>Created at : {el.created_at}</p>
                                <a href={el.html_url} target="_blank" rel="noreferrer"><button>Open Repo</button></a>
                            </div>
                        </div>
                    }
                    else return null
                })
                : null}
        </div>
    )
}
export default List;