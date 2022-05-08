function SideBarItem(props) {
    return (
        <div>
            <button className='flex items-center space-x-2 hover:text-white'>
                <div className='h-5 w-5'>
                    {props.icon}
                </div>
                <p>{props.text}</p>
            </button>
        </div>
    )
}

export default SideBarItem
