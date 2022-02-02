
export default function Form(){

    return (
        <>
        
        <form className="md:w-96">
            <div className="mb-6">
                <label className="block mb-2 font-mono text-sm font-medium dark:text-gray-400">Receiver Address</label>
                <input type="text" id="eth" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light font-mono" placeholder="0X0000...0000" required></input>
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-mono text-sm font-medium dark:text-gray-400">ETH ammount</label>
                <input type="text" id="ammount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light font-mono" required placeholder="1-10000"></input>
            </div>

            </form>
            <button type='button'  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Crypto</button>
        </>
    );
}