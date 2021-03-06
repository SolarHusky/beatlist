<template>
  <div>
    <ListViewer :items="getSongs" :filter="filter" :total="total" @paginate="updatePagination" :loading="loading"
                :items-per-page="itemsPerPage" :items-per-page-options="itemsPerPageOptions" @updateSearch="search"
                :allow-filter="allowFilter" item-key="key" :sort-by="sortBy" :sort-desc="sortDesc" :custom-sort="customSort">
      <template #item-block="{item}">
        <v-hover>
          <v-card width="305px" height="160px"
                  slot-scope="{ hover }" @click.stop="showInfo(item)"
                  :class="`elevation-${hover ? 12 : 2}`" style="cursor: pointer">
            <v-layout justify-space-between row>
              <v-flex xs5>
                <SongCover :song="item" class="mx-2" height="100px"></SongCover>
              </v-flex>
              <v-flex xs7 pa-3>
                <v-container pa-0>
                  <div class="subheading text-truncate ma-1">{{item.metadata.songName}}</div>
                  <div class="caption text-truncate ma-1">{{item.metadata.songAuthorName}}</div>
                  <div class="caption text-truncate ma-1">{{item.metadata.levelAuthorName}}</div>
                </v-container>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-0">
              <slot name="item-block-action" :item="item"></slot>
            </v-card-actions>
          </v-card>
        </v-hover>
      </template>

      <template #item-list="{item}">
        <v-list-item @click.stop="showInfo(item)">
          <v-list-item-avatar class="my-0">
            <SongCover :song="item"></SongCover>
          </v-list-item-avatar>
          <v-list-item-content class="pa-0">
            <v-list-item-title>{{item.metadata.songName}}</v-list-item-title>
            <v-list-item-subtitle>
              {{item.metadata.songAuthorName}} - {{item.metadata.levelAuthorName}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="my-0">
            <slot name="item-list-action" :item="item"></slot>
          </v-list-item-action>
        </v-list-item>
      </template>

      <template #filter>
        <slot name="filter"></slot>
      </template>

      <template #sortBy>
        <slot name="sortBy"></slot>
      </template>

    </ListViewer>

    <v-dialog v-model="dialog" width="700">
      <OnlineSongInfo :song="getSongOnlineItem(song)">
        <template #action>
          <v-btn text @click="dialog = false">Close</v-btn>
        </template>
      </OnlineSongInfo>
    </v-dialog>

  </div>
</template>

<script>
  import Vue from 'vue';
  import SongCover from '@/components/SongCover.vue';
  import ListViewer from '@/components/ListViewer.vue';
  import OnlineSongInfo from '@/components/OnlineSongInfo';

  export default Vue.extend({
    name: 'ListViewerForSongs',
    components: {ListViewer, SongCover, OnlineSongInfo},
    props: {
      items: {Type: Array, required: true},
      total: {type: Number, default: undefined},
      filter: {type: Function, default: undefined},
      loading: {type: Boolean, default: false},
      itemsPerPage: {type: Number, default: 12},
      itemsPerPageOptions: {type: Array, default: () => [6, 12, 24, 48]},
      allowFilter: {type: Boolean, default: false},
      sortBy: {type: String, default: undefined},
      sortDesc: {type: Boolean, default: true},
      customSort: {type: Function, default: undefined},
    },
    data: () => ({
      dialog: false,
      song: undefined,
    }),
    computed: {
      getSongs() {
        return this.items;
      },
    },
    methods: {
      showInfo(song) {
        this.dialog = true;
        this.song = song;
      },
      updatePagination(payload) {
        this.$emit('paginate', payload);
      },
      search(str) {
        this.$emit('updateSearch', str);
      },
      getSongOnlineItem(song) {
        return !!song && !!song.onlineData ? song.onlineData : song;
      },
    },
  });
</script>

<style scoped>

</style>
