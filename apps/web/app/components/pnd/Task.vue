<script setup lang="ts">
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import { getTaskData, isTaskData, type TTask } from './task-data'

const { task } = defineProps<{
  task: TTask
}>()

type TaskState =
  | {
    type: 'idle'
  }
  | {
    type: 'preview'
    container: HTMLElement
  }
  | {
    type: 'is-dragging'
  }
  | {
    type: 'is-dragging-over'
    closestEdge: Edge | null
  }

const stateStyles: { [Key in TaskState['type']]?: string } = {
  'is-dragging': 'opacity-40',
}

const idle: TaskState = { type: 'idle' }
const elRef = ref<HTMLDivElement | null>(null)
const elState = useState<TaskState>('task_' + task.id, () => idle)

let cleanup = () => {}
onMounted(() => {
  const { draggable, dropTargetForElements, combine, setCustomNativeDragPreview, pointerOutsideOfPreview, attachClosestEdge, extractClosestEdge } = useNuxtApp().$PragmaticDND

  if (elRef.value == null) {
    return
  }

  cleanup = combine(
    draggable({
      element: elRef.value,
      getInitialData() {
        return getTaskData(task)
      },
      onGenerateDragPreview({ nativeSetDragImage }) {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          getOffset: pointerOutsideOfPreview({
            x: '16px',
            y: '8px',
          }),
          render({ container }) {
            elState.value = { type: 'preview', container }
          },
        })
      },
      onDragStart() {
        elState.value = { type: 'is-dragging' }
      },
      onDrop() {
        elState.value = idle
      },
    }),
    dropTargetForElements({
      element: elRef.value,
      canDrop({ source }) {
        // not allowing dropping on yourself
        if (source.element === elRef.value) {
          return false
        }
        // only allowing tasks to be dropped on me
        return isTaskData(source.data)
      },
      getData({ input }) {
        const data = getTaskData(task)
        return attachClosestEdge(data, {
          element: elRef.value!,
          input,
          allowedEdges: ['top', 'bottom'],
        })
      },
      getIsSticky() {
        return true
      },
      onDragEnter({ self }) {
        const closestEdge = extractClosestEdge(self.data)
        elState.value = { type: 'is-dragging-over', closestEdge }
      },
      onDrag({ self }) {
        const closestEdge = extractClosestEdge(self.data)

        // Only need to update react state if nothing has changed.
        if (
          elState.value.type !== 'is-dragging-over'
          || elState.value.closestEdge !== closestEdge
        ) {
          elState.value = { type: 'is-dragging-over', closestEdge }
        }
      },
      onDragLeave() {
        elState.value = idle
      },
      onDrop() {
        elState.value = idle
      },
    }),
  )
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <div class="relative">
    <div
      ref="elRef"
      :data-task-id="task.id"
      :class="[
        'flex text-sm bg-white flex-row items-center border border-solid rounded p-2 pl-0 hover:bg-slate-100 hover:cursor-grab',
        stateStyles[elState.type] ?? '',
      ]"
    >
      <div class="w-6 flex justify-center">
        <Icon name="lucide:grip-vertical" />
      </div>
      <span class="truncate flex-grow flex-shrink">{{ task.content }}</span>
      <PndStatus :status="task.status" />
    </div>
    <PndDropIndicator
      v-if="elState.type === 'is-dragging-over' && elState.closestEdge"
      :edge="elState.closestEdge"
      gap="8px"
    />
  </div>
  <Teleport
    v-if="elState.type === 'preview'"
    :to="elState.container"
  >
    <div class="border-solid rounded p-2 bg-white">
      {{ task.content }}
    </div>
  </Teleport>
</template>
