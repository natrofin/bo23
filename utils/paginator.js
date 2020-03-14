module.exports = {
    paginator: class Pages {
        //new Pages()
        constructor(userId = '', options = {}) {
            this.pages = options.pages || [];
            this.time = options.time || 120000;
            this.reactions = options.reactions || {back: '⬅', next: '➡', last: '⏩', first: '⏪', stop: '⏹'};
            this.page = 1;
            this.userId = userId;
            this.full = options.full || false;
        }

        add(page) {
            this.pages.push(page);
            return this;
        }

        async send(channel, page = 1) {
            const msg = await channel.send(this.pages[page - 1]);
            this.page = page;
            this.msg = msg;
            await this.addReactions();
            this.createCollector(this.userId);
            return msg;
        }

        async select(page = 1) {
            this.page = page;
            await this.msg.edit(this.pages[page - 1]);
            return this;
        }

        createCollector(userId) {
            const collector = this.msg.createReactionCollector((_, u) => u.id === userId, {time: this.time});
            this.collector = collector;
            collector.on('collect', react => {
                if (react.emoji.name === this.reactions.back && this.page !== 1) this.select(this.page - 1);
                else if (react.emoji.name === this.reactions.next && this.page !== this.pages.length) this.select(this.page + 1);
                else if (react.emoji.name === this.reactions.first && this.page !== 1) this.select(1);
                else if (react.emoji.name === this.reactions.last && this.page !== this.pages.length) this.select(this.pages.length)
                else if (react.emoji.name == this.reactions.stop) this.msg.delete();
                react.remove(userId).catch(() => {});
            });
            collector.on('end', () => this.msg.clearReactions());
        }
        async addReactions() {
            if (this.full) await this.msg.react(this.reactions.first);
            await this.msg.react(this.reactions.back);
            await this.msg.react(this.reactions.next);
            await this.msg.react(this.reactions.stop)
            if (this.full) await this.msg.react(this.reactions.last);
        }
    }
}