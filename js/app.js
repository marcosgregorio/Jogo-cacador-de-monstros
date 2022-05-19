new Vue({
    el: '#app',
    data: {
        logs: [],
        running: false,
        playerLife: 100,
        monsterLife: 100,
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0;
        }
    },
    methods: {
        startGame() {
            this.running = true,
                this.playerLife = 100,
                this.monsterLife = 100
        },
        attack(special) {
            this.hurt('monsterLife', 5, 10, special, 'Jogador', 'Monstro', 'player')
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        hurt(prop, min, max, special, source, target, cls) {
            const plus = special ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0);
            this.registerLogs(`${source} atingiu ${target} com ${hurt}`, cls)
        },
        getRandom(min, max) {
            const value = parseInt(Math.random() * (max - min) + min)
            console.log(value);
            return value    
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false,'Monstro','Jogador')
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLogs(`Jogador curou: ${heal}`, 'player')
        },
        registerLogs(text, cls){
            this.logs.unshift({text,cls})
           
        },
    },
    watch: {
        hasResult(event) {
            if (event) { this.running = false; }
        }
    },
})