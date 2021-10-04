import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {

    state = {
        users:[],
        userSelected:"",
        title:"",
        content:"",
        date:new Date(),
        editing:false,
        _id:""
    }

    async componentDidMount(){
        const res = await axios.get("http://localhost:4000/api/users")
        const usernames = res.data.map(user =>user.username)
        this.setState({ users:usernames, userSelected:usernames[0] })
        if(this.props.match.params){
            const res = await axios.get("http://localhost:4000/api/notes/"+this.props.match.params.id)
            this.setState({ 
                editing:true ,
                _id:this.props.match.params.id,
                title:res.data.title,
                content:res.data.content,
                date:new Date(res.data.date),
                userSelected:res.data.author,
            })
        }
    }

    onSubmit= async (e)=>{
        const newNote={
            title:this.state.title,
            content:this.state.content,
            date:this.state.date,
            author:this.state.userSelected
        }

        if(this.state.editing){
            await axios.put("http://localhost:4000/api/notes/"+this.state._id,newNote)

        }else{
            await axios.post("http://localhost:4000/api/notes",newNote)
        }
        e.preventDefault();
        window.location.href="/"
    };

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onChangeDate=(date)=>{
        this.setState({date:date});
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body ">
                    <h2>Create a new note</h2>

                    {/* Select User*/}

                    <div className="form-group" style={{marginBottom:"1rem"}}>
                        <select className="form-control" name="userSelected"
                        onChange={this.onChange} value={this.state.userSelected}>
                            {
                                this.state.users.map(user => 
                                <option key={user} value={user}>
                                    {user}
                                </option>
                                )

                            }
                        </select>
                    </div>

                    <div className="form-group" style={{marginBottom:"1rem"}}>
                        <input className="form-control" type="text" placeholder="Title" name="title" onChange={this.onChange} value={this.state.title} required/>
                    </div>

                    <div className="form-group" style={{marginBottom:"1rem"}}>
                        <textarea name="content" placeholder="Content" onChange={this.onChange} value={this.state.content} required>
                        </textarea>
                    </div>

                    <div className="form-group" style={{marginBottom:"1rem"}}> 
                        <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
