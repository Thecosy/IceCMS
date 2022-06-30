<template>
  <ResourceDetail :is-edit="true" />
</template>

<script>
import ResourceDetail from './components/ResourceDetail'

export default {
  name: 'NewResource',
  components: { ResourceDetail }
}
</script>
