
export function NameInput(props) {
    return (
        <input
            className={'truncate ... w-full mt-4 p-2 rounded-full text-white text-center border-0 outline-0 text-2xl bg-gray-700'}
            defaultValue={'Anonymous'}
            onChange={props.handleNameChange}></input>
    )
}
