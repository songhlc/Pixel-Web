<template lang="html">
    <div class="home" id="home">
        <div class="list"  v-for="x in list">
            <pixel-content :x="x"></pixel-content>
        </div>
        <div class="refresh-footer" v-if="option.refresh">
            <pixel-spinner :size="'45px'" :color="'#007AFF'"></pixel-spinner>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "home",
    data() {
        return {
            list: [],
			pageSize: 10
        };
    },
    computed: {
        ...mapGetters({
            statuses: 'home_timeline',
            option: 'home_timeline_option',
            showImage: 'image_zoom_show'
        })
    },
    watch: {
        option: {
            handler: function (val, oldVal) {
                if (val && val.page == 0) {
                    this.list = []
                }
            },
            deep: true
        },
        statuses: function (val, oldVal) {
            if (val) {
                if (this.option.page == 0) {
                    this.list = val;
                } else {
                    this.list = [...this.list, ...val]
                }
            }
        }
    },
    created() {
        this.homeTimeline(0)
    },
    mounted() {

    },
    activated() {
        window.addEventListener('scroll', this.scrollBar)
    },
    deactivated() {
        window.removeEventListener('scroll', this.scrollBar)
    },
    methods: {
        ...mapActions([
            'getHomeTimeline'
        ]),
        homeTimeline(page) {
            this.getHomeTimeline({pageIndex: page, pageSize: this.pageSize})
        },
        loadMore() {
            let vue = this
            vue.option.refresh = true
            var page = vue.option.page
            vue.homeTimeline(page)
        },
        scrollBar() {
            var vue = this
            var a = document.documentElement.scrollTop == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
            var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            var c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
            if (a + b == c && !this.showImage) {
                this.loadMore()
            }
        }
    }

}
</script>

<style lang="css">
.list {
    flex: 1;
    background-color: #fff;
    border-radius: 2px;
    padding: 1rem;
    margin-bottom: .8rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
}

.refresh-footer {
    margin-bottom: .8rem;
    margin-top: .8rem;
    text-align: center;
}
</style>
