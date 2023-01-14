import Questions from "./Questions"

export default function Quiz(){

    const onNext = () => {
        alert("next clicked")
    }

    const onPrev = () => {
        alert("prev clicked")
    }

    return (
        <div className="container">
            <h1 className="title text-light">Quiz Application</h1>

            {/* Questions component */}
            <Questions/>

            <div clsssName='grid'>
                <button className="btn prev" onClick={onPrev}>Prev</button>
                <button className="btn next" onClick={onNext}>Next</button>
            </div>
        </div>
    )
}