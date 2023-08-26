import React, { useCallback, useState } from 'react'
import AddQuestion from './AddQuestion/AddQuestion';
import './AdminQuestionPage.css'
import QuestionTable from './QuestionTable/QuestionTable';

const AdminQuestionPage = () => {
    const [showQuestionForm, setShowQuestionForm] = useState(false);

    const toggleQuestionForm = useCallback(() => {
      setShowQuestionForm(!showQuestionForm);
    })

    return (
        <div>
          <button onClick={toggleQuestionForm}>Add Question</button>
          {showQuestionForm && <AddQuestion/>}

          <QuestionTable/>
        </div>
      );
}

export default AdminQuestionPage