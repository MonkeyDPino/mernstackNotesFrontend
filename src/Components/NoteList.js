import React, { Component } from 'react'
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from "react-router-dom"

export default class NoteList extends Component {

    state={
        notes:[]
    }

    async componentDidMount() {
        this.getNotes();
    }

    deleteNote= async(id) => {
        await axios.delete("http://localhost:4000/api/notes/"+id)
        this.getNotes();
    }

    getNotes= async() => {
        const res = await axios.get("http://localhost:4000/api/notes")
        this.setState({notes:res.data})
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note =>
                            <div className="col-md-4 p-2" key={note._id}>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between">
                                        <h3>{note.title}</h3>
                                        <Link to={"/edit/"+note._id}className="btn btn-secondary">Edit</Link>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            {note.content}
                                        </p>
                                        <p>
                                            {note.author}
                                        </p>
                                        <p>
                                            {format(note.date)}
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <button type="button" className="btn btn-danger" onClick={()=>{this.deleteNote(note._id)}}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}
