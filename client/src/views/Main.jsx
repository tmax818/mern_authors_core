import React, { useEffect, useState } from 'react'
import AuthorForm from '../components/AuthorForm';
import AuthorList from '../components/AuthorList';
import axios from "axios";
import {Link} from "react-router-dom";

const Main = (props) => {
    const [authors, setAuthors] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/authors')
            .then(res=>{
                setAuthors(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[authors]);

    return (
        <div>
            <Link to={"/new"}>Add an author</Link>
            <hr/>
            {loaded && <AuthorList authors={authors}/>}
        </div>
    )
}

export default Main;

