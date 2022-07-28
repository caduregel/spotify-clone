import { getProviders, signIn } from "next-auth/react"

function login({ providers = {} }) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <div  className="xtext-white p-10">
                <h2 className="text-white">Due to the way the spotift API works, spotify needs to be running </h2>
                <h2 className="text-white">on any device or browser in order to play songs</h2>
            </div>

            <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt=""></img>
            {Object.values(providers).map((provider, index) => (
                <div key={index}>
                    <button
                        className="bg-[#18D860] text-white p-5 rounded-lg"
                        onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers,
        }
    }
}

export default login
