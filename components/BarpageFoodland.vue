<template>
  <v-app-bar app color="indigo" dark>
    <v-toolbar-title>FOOD LAND</v-toolbar-title>
    <v-spacer />
    <v-btn text to="/home">
      <span class="mr-2">Home</span>
    </v-btn>
    <v-btn text to="/recipes">
      <span class="mr-2">Recipes</span>
    </v-btn>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn icon to="/login" v-bind="attrs" v-on="on">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
  </v-app-bar>
</template>
