import PaletteComponent from "./PaletteComponent"

const components = [
    {
        code: `
        <button title="Save" class="cursor-pointer flex items-center fill-lime-400 bg-lime-950 hover:bg-lime-900 active:border active:border-lime-400 rounded-md duration-100 p-2">
            <svg viewBox="0 -0.5 25 25" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z" clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-lime-400 font-bold pr-1">Save Post</span>
        </button>
        `,
    },
    {
        code: `
<form>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            
            
              </p><div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Your username
                </label>
                <input placeholder="JohnDoe" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text">
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="password" type="password">
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="confirmPassword" type="password">
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" type="checkbox" aria-describedby="terms" id="terms">
                </div>
                <div class="ml-3 text-sm">
                  <label class="font-light text-gray-500 text-gray-300">
                    I accept the
                    <a href="#" class="font-medium text-primary-600 hover:underline text-primary-500">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <button class="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                Create an account
              </button>
            
          </div>
        </div>
      </div></form>
    
        `,
    },
]

export default function Palette() {
    return (
        <div className="flex flex-col p-2 gap-2">
            {components.map((component, i) => (
                <PaletteComponent key={i} {...component} />
            ))}
        </div>
    )
}
