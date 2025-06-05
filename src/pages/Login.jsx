import { useContext, useRef } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router";
import { AXIOS } from "../services";

const Login = () => {

    const { setLogado } = useContext(LoginContext);
    const navigate = useNavigate()

    const emailRef = useRef();
    const senhaRef = useRef();

    async function onLogin(event) {
        event.preventDefault();
        let dados = {
            usuario_email: emailRef.current.value,
            usuario_senha: senhaRef.current.value
        }

        const request = await AXIOS.post("/login", dados);
        if (request.data.token) {
            sessionStorage.setItem("token", request.data.token);
            sessionStorage.setItem("usuario", JSON.stringify(request.data.usuario));
            setLogado(true);
            navigate("/");
            return;
        }

        alert(request.data.mensagem);


        // setLogado(true);
        // navigate("/");
    }

    return (
        <div>
            <div className="bg-white p-[30px] rounded xl:w-[580px]">
                <form onSubmit={onLogin}>
                    <h4 className="text-center text-[22px] leading-[34px] font-bold xl:text-left xl:mb-5">Acesse sua conta</h4>
                    <p className="text-grafite text-center mb-[30px] xl:text-left">Novo cliente? Então registre-se <a href="" className="underline hover:text-rosa">aqui</a>.</p>
                    <label className="block mb-1">Login *</label>
                    <input
                        ref={emailRef}
                        type="text"
                        placeholder="Insira seu login ou email"
                        className="bg-grafite/5 rounded w-full mb-5 h-[60px] duration-150 outline-transparent focus:outline-rosa pl-4"
                        required
                    />
                    <label className="block mb-1">Senha *</label>
                    <input
                        ref={senhaRef}
                        type="password"
                        placeholder="Insira sua senha"
                        className="bg-grafite/5 rounded w-full mb-[30px] h-[60px] duration-150 outline-transparent focus:outline-rosa pl-4"
                        required
                    />
                    <a href="" className="text-grafite underline hover:text-rosa mb-[30px] block">Esqueci minha senha</a>
                    <button
                        className="w-full h-[48px] bg-rosa hover:bg-rosa-hover text-white rounded duration-150 font-bold cursor-pointer"
                    >
                        Acessar Conta
                    </button>
                </form>
            </div>
            <div className="hidden">

            </div>
        </div>
    );
}

export default Login;