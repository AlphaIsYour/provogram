export default function SignupPage() {
  return (
    <div
      className="grid grid-cols-2 items-center justify-center h-screen bg-[#0D1117]"
      style={{ fontFamily: "mona-sans" }}
    >
      <div className="flex flex-col bg-black text-white h-full items-center justify-center">
        <p>halo</p>
      </div>

      <div className="flex flex-col bg-white h-full items-center justify-center">
        <div className="w-150 flex flex-col justify-center">
          <h1 className="text-bold text-4xl mb-5">Sign up to Provogram</h1>
          <h3>Email</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded p-2 w-150 mb-4"
          />
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded p-2 w-150 mb-4"
          />
          <h3>Confirm Password</h3>
          <input
            type="password"
            placeholder="Confirm your password"
            className="border border-gray-300 rounded p-2 w-150 mb-4"
          />
          <h3>Username</h3>
          <input
            type="text"
            placeholder="Enter your username"
            className="border border-gray-300 rounded p-2 w-150 mb-4"
          />
          <h3>Your Country/Region</h3>
          <div className="mb-4">
            <select
              className="border border-gray-300 rounded p-2 w-150"
              defaultValue=""
            >
              <option value="" disabled>
                Select your country/region
              </option>
              <option value="us">🇺🇸 United States</option>
              <option value="id">🇮🇩 Indonesia</option>
              <option value="gb">🇬🇧 United Kingdom</option>
              <option value="jp">🇯🇵 Japan</option>
              <option value="de">🇩🇪 Germany</option>
              <option value="fr">🇫🇷 France</option>
              <option value="in">🇮🇳 India</option>
              <option value="cn">🇨🇳 China</option>
              <option value="au">🇦🇺 Australia</option>
              <option value="sg">🇸🇬 Singapore</option>
              {/* Tambahkan negara lain sesuai kebutuhan */}
            </select>
          </div>
          <div className="w-64 flex flex-col">
            <button className="bg-black text-white rounded p-2 mb-4">
              Sign Up
            </button>
          </div>
          <p className="text-gray-500 mb-4">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-blue-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-500">
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-gray-500">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
