
class Model {

   constructor () {
      this.todos = [];
      this.inputValue = null;
      this.render = undefined;
   }
  
   subscribe(render) {
      this.render = render;
   }
   inform() {
      console.log(this.todos.map(e => e.text));
      this.render();
   }
   addTodo(text) {
      this.todos.push({
         id: Utils.uuid(),
         text: text,
         completed: false
      });
      this.inform();
   }
   updateTodo(index, todo) {
      this.todos[index] = todo;
      this.inform();
   }
   removeTodo(todo) {
      this.todos = this.todos.filter(item => item !== todo);
      this.inform();
   }
   checkTodo(todo){
     

   }
}


                       
      

  
const App = ({ title, model }) => {
   const items = model.todos.map((todo, index) => {
      return (
         <li key={todo.id}>
            <input
               type="text"
               value={todo.text}
               onChange={e =>
                  model.updateTodo(index, {
                     id: todo.id,
                     text: e.target.value,
                     completed: todo.completed
                  })}
            />
            <label >Confirmed<input type="checkbox" ></input></label>
            
            
            <button onClick={() => model.removeTodo(todo)}> remove</button>
         </li>
        
      );
   });
   return (
         
      <div>
            <header>
         <h1> {title} </h1>
         <p>Registration App</p>
         </header>
         <form id="registrar" 
            onSubmit={e => {
               e.preventDefault();
               model.addTodo(model.inputValue);
            }}
         >
            <input onChange={e => (model.inputValue = e.target.value)} placeholder="Invite Someone"></input>
            <button type="submit">Submit</button>
            
            
         </form>
         <h2>Invitess</h2>
          <ul id="invitedList"> {items} </ul>
      </div>
   );
};

let model = new Model();
let counter = 1;
let render = () => {
   console.log('render times: ', counter++);
   ReactDOM.render(
      <App title="RSVP" model={model} />,
      document.getElementById('container')
   );
};

model.subscribe(render);
render(); 