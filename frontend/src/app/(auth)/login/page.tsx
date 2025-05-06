
export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-10 rounded-xl shadow-lg">
      <img
        src="../assets/moneyly-logo.png"
        alt="Moneyly logo"
        className="mx-auto mb-6 w-32"
      />

      <form>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-5 text-lg font-semibold rounded-md mb-4"
        >
          Ingresar con Google
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-5 text-lg font-semibold rounded-md"
        >
          Ingresar con Microsoft
        </button>
      </form>
    </div>
  );
}
