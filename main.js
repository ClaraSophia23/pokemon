const formulario = document.getElementById("formPoke");
const msgErro = document.getElementById("msg");
const cardResultado = document.getElementById("resultado");

formulario.addEventListener("submit", async function(evento){
    evento.preventDefault(); // Evitar que a página recarregue
    msgErro.textContent = "";

    const id = document.getElementById("idPoke").value;

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        const pokemon = await resposta.json();

        // Preenchendo os dados principais
        document.getElementById("nomePokemon").textContent = pokemon.name;
        document.getElementById("imgPoke").src = pokemon.sprites.front_default;
        document.getElementById("basePoke").textContent = pokemon.base_experience;

        // Preenchendo os 3 novos campos (Tipo, HP e Ataque)
        document.getElementById("tipoPoke").textContent = pokemon.types.map(t => t.type.name).join(', ');
        document.getElementById("hpPoke").textContent = pokemon.stats[0].base_stat;
        document.getElementById("ataquePoke").textContent = pokemon.stats[1].base_stat;

        // Mostra a carta na tela com efeito visual
        cardResultado.style.display = "block";

        // Tocar o som (cries) oficial do Pokémon
        if (pokemon.cries && pokemon.cries.latest) {
            const audio = new Audio(pokemon.cries.latest);
            audio.volume = 0.4;
            audio.play().catch(e => console.log("Áudio bloqueado pelo navegador até haver interação extra.", e));
        }

    } catch (error) {
        msgErro.textContent = "Erro ao buscar o Pokémon. Tente outro ID!";
        cardResultado.style.display = "none";
    }
});