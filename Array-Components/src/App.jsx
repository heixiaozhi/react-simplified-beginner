import {useState} from "react"

const INITIAL_VALUE = ["A", "B", "C"]

function App() {
    const [arr, setArr] = useState(INITIAL_VALUE)
    const [value, setValue] = useState("")

    function removeFirstElement() {
        setArr((current) => {
            return current.slice(1)
        })
    }

    function removeSpecificLetter(letter) {
        setArr((current) => {
            return current.filter((el) => el !== letter)
        })
    }

    function addElementToStart(element) {
        setArr((current) => {
            return [element, ...current]
        })
    }

    function addElementToEnd(element) {
        setArr((current) => {
            return [...current, element]
        })
    }

    function clean() {
        setArr([])
    }

    function reset() {
        setArr(INITIAL_VALUE)
    }

    function updateAToH(target, result) {
        setArr((current) => {
            return current.map((el) => {
                if (el === target) return result
                return el
            })
        })
    }

    function addLetterToStart() {
        setArr((current) => {
            return [value, ...current]
        })
    }

    function addLetterAtIndex(index, value) {
        setArr((current) => {
            return [...current.slice(0, index), value, ...current.slice(index)]
        })
    }

    return (
        <>
            <button onClick={removeFirstElement}>remove first el</button>
            <button onClick={() => removeSpecificLetter("B")}>
                remove specific Letter
            </button>
            <button onClick={() => addElementToStart("A")}>
                add a new element to the start
            </button>
            <button onClick={() => addElementToEnd("D")}>
                add a new element to the end
            </button>
            <button onClick={clean}>clean array</button>
            <button onClick={reset}>reset array</button>
            <button onClick={() => updateAToH("A", "H")}>update all A to H</button>
            <input value={value} onChange={(e) => setValue(e.target.value)}></input>
            <button onClick={addLetterToStart}>input connected</button>
            <button onClick={() => addLetterAtIndex(3, "U")}>
                add any index in the array
            </button>
            <p>{arr.join(",")}</p>
        </>
    )
}

export default App
