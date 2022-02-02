import Form from './Form'
import eth from '../img/face.png' 
import pistol from '../img/pistol.png' 
import Button from './addressLogic/Button'


export default function Interface(){


      return (
        <>
        <div className="z-10 flex flex-col items-center justify-center h-screen p-16">
            <div className='items-center justify-center block p-10 space-y-10 bg-white border-2 border-white rounded-md md:space-x-10 md:flex md:space-y-0'>

                    <header>

                        <div className='relative z-10 flex flex-col items-center justify-center space-y-4'>
                            <h1 className='text-6xl font-bold text-center text-gray-600 grow-0 font-poppins'>
                                Transfer ETH .
                            </h1>   
                            <p className=" text-xl font-bold text-center text-purple-400 font-rubik">
                                we hate/kill gas.
                            </p>  
                            <Button balance="2"/>
                        </div>
                        <img className="absolute bottom-0 face md:top-1/4" src={eth} alt="eth"/>
                    </header>
                    <div className="">
                        <Form />
                        <img className="absolute top-0 md:top-2/3 md:right-1/4 face" src={pistol} alt="eth"/>
                    </div>
            </div>
        </div>
      </>
    ) 
}