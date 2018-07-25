import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API_URL = "http://localhost:3005"


class Form extends Component {
  
  handleChange(e) {
    e.preventDefault();
    this.props.changeSomthing(e.target.children)
  }
  render(){
    return (
      <div>
        <form onSubmit={this.handleChange.bind(this)}>
           Title: <input name="title"/> 
           Category: <input name="category"/>
           <input type="submit" value="submit"/>
        </form>
      
      </div>
    )
  }
}

class App extends Component {
  state={
    articles: [],
    somthing: ""
  }

  async componentDidMount(){
    const api_call = await fetch(`${API_URL}/api/v1/articles`);
    const data = await api_call.json();
    this.setState({articles: data})

  }

  async addArticle(formChildern){
    const body_1 =JSON.stringify({title: formChildern.title.value, category: formChildern.category.value})
    
    const api_call = await fetch(`${API_URL}/api/v1/articles`,{
      method: 'post',
      headers:{
        'Content-Type' :'application/json'
      },
      body:body_1
    } );
    const data = await api_call.json(); 
    const articles = this.state.articles;
    articles.push(data);
    console.log(articles)
    this.setState({articles: articles})

  }
  changeSomthing(somthing) {
    this.setState({somthing: somthing.title.value})
  }
  

  render() {
    
    
    return (
      <div className="App">
        <Form changeSomthing={this.addArticle.bind(this)}/>

      {
        this.state.articles.map(a => {
          return <h1>{a.title}</h1>
            
        })
      }
      {this.state.somthing}

      </div>
    );
  }
}

export default App;
