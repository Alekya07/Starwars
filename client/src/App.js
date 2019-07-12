import React, { Component } from 'react';
import './App.css';

class App extends Component {

constructor(props) {
    super(props);
    this.state = { female: [], male: [], females: 0, males: 0, flag: 0 };
  }

  fetchData(url) {
    let female = this.state.female,
      male = this.state.male,
      males = this.state.males,
      females = this.state.females;

    if (url === null || (males === 5 && females === 5)) return;

    fetch(url)
      .then(res => res.json())
      .then(people => {
        for (var i = 0; i < people.results.length; i++) {
          if (people.results[i].gender === "female" && females < 5) {
            female.push(people.results[i]);
            females += 1;
            this.setState({ females });
          } else if (people.results[i].gender === "male" && males < 5) {
            male.push(people.results[i]);
            males += 1;
            this.setState({ males });
          }
        }

        this.setState({ female: female });
        this.setState({ male: male });
        this.fetchData(people.next);
      });
  }

  componentDidMount() {
    this.fetchData("https://swapi.co/api/people/");

  }

  loadMale(){
    if(this.state.flag === 0){
    let charac=this.state.female;
    charac=charac.concat(this.state.male);
    this.setState({female: charac});
    this.setState({flag: 1});
  }
  }

  render() {

  return (
    <div className="App">
    <h2 className='heading'>WELCOME TO STARWARS</h2>
    <table className='my-table'>
    <thead>
    <tr>
    <th className='head'>NAME</th>
    <th className='head'>GENDER</th>
    </tr>
    </thead>
    <tbody>
        {this.state.female.map(female => (
          <tr>
          <td className='text'>{female.name}</td>
          <td className='text'>{female.gender}</td>
          </tr>))}
    </tbody>
    </table>

    <button className='button' onClick={()=>this.loadMale()}>Click Me to display Male Characters</button>
    </div>
  );
}


  }

export default App;
