import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import repo from '../images/repo.png';
import './list.css';


interface Listprops {
    data: any
}

// This Component renders Card of the result depending on the category : users / Repos

const List: React.FC<Listprops> = ({ data }) => {

    const type = useSelector((state: RootState) => state.type.type);
    return (
        <div className="grid-container">

            {data.length && type ?
                data.map((el: any, i: any) => {

                    if (type === 'users') {
                        return <div key={i} className="grid-item">
                            <img className="image" src={el.avatar_url} alt={el.login} />
                            <div className="userInfo">
                                <h3 className="userName"> Username : {el.login}</h3>
                                <p><span id="id">ID : </span>{el.id}</p>
                                <div className="buttonDiv">
                                    <a href={el.html_url} target="_blank" rel="noreferrer"><button id="userButton">visit Profile</button></a>
                                </div></div>
                        </div>
                    }
                    else if (type === 'repositories' && el.owner) {
                        return <div key={i} className="grid-item">

                            <div className="repoInfo">
                                <img className="repo" src={repo} alt={el.name} />

                                <h3 id="reponame"> Name : {el.name}</h3>
                                <div className="descriptionDiv">   {el.description ? <p> <span>Description : </span>{el.description}</p> : null}

                                    {el.language ? <p> <span>Language : </span>{el.language}</p> : null}
                                    <p> <span>Forks : </span> {el.forks} </p>
                                </div>
                                <div className="flexOwner">

                                    <img className="Smallimage" src={el.owner.avatar_url} alt={el.owner.login} />
                                    <h6><span>Owner : </span> {el.owner.login}</h6>
                                </div>
                                <p><span>Created at : </span>{el.created_at.slice(0, 10)}</p>
                                <div className='buttonDiv'> <a href={el.html_url} target="_blank" rel="noreferrer"><button id="openRepo">Open Repo</button></a>
                                </div></div>
                        </div>
                    }
                    else return null
                })
                : null}
        </div>
    )
}
export default List;