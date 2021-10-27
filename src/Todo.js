import React ,{useState, useEffect}from "react";
import "./style.css";
function Todo() {
    const[value,setValue]=useState("")
    const storeValueHandler=(event)=>{
        setValue(event.target.value)
    }
    let addUniqueItem={
      id:new Date().getTime().toString(),
      item:value,
    }
    const getLocalData=()=>{
      const list=localStorage.getItem("myTodoList")
      if(list){
        return JSON.parse(list)
      }else{
        return []
      }
    }
    const[items,setItems]=useState(getLocalData())
    const addValueHandler=()=>{
      if(value===""){
        alert("add your todo")
      }else{
       setItems([...items,addUniqueItem])
       setValue("")
      }
    }
    const deleteItems=(delEle)=>{
      const updatedItem=items.filter((currEle)=>{
        return currEle.id !== delEle
        
      })
      setItems(updatedItem)
    }
    const deleteAll=()=>{
      setItems([])
    }
    //Add items in local Storage
    useEffect(()=>{
      localStorage.setItem("myTodoList",JSON.stringify(items))
    }
      ,[items])
    
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todoLogo"></img>
            <figcaption>Add Your List Here✌</figcaption>
          </figure>
          
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={value}
              onChange={storeValueHandler}
            ></input>
            <i className="fa fa-plus add-btn " onClick={addValueHandler} ></i>
          </div>
            {items.map((currEle)=>{
             
                return(
                  <>
                     <div className="showItems" >
            <div className="eachItem" key={currEle.id}>
              <h3>{currEle.item}</h3>
              <div className="todo-btn">
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt" onClick={()=>deleteItems(currEle.id)}></i>
              </div>
            </div>
          </div>

                  </>
                )
            })
              
            }
         

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={deleteAll}>
              <span> Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
