import React, { useState } from 'react'
import { createTodoApi } from '../../services/api';

function AddTodoModal({setrefreshList}) {
  const [todoDesc,setTodoDesc]=useState('')
  const handleTodoSubmit=async ()=>{
    
    console.log(todoDesc,'tododesc')
     if(todoDesc===''){
        window.alert("error todo is empty");
        return;
     }

     const result=await createTodoApi({desc:todoDesc});
    if(result.status===200 && result.data.status===200){
        window.alert("todo created");
        setrefreshList(new Date());
        setTodoDesc('')
    }
    else{
        window.alert(result.data.message)
    }

}


  return (
    <div className="modal mt-5" id="exampleModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">MODAL TITLE</div>
              <button type="button" className='btn-close' data-bs-dismiss="modal"
              aria-label='close'>
                <span arial-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <textarea name="" rows={3} onChange={(e)=>{setTodoDesc(e.target.value)}}
                 className="form-control" placeholder='write todos'></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleTodoSubmit} data-bs-dismiss="modal">SAVE TO DO</button>
              <button className="btn btn-secondary" onClick={()=>{setTodoDesc('')}}     data-bs-dismiss="modal">close</button>
            </div>
          </div>
        </div>
       </div>

  )
}

export default AddTodoModal
