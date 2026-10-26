import React from 'react'
import { CircleCheck, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { translate } from '@/i18n/i18n'
import { formatActiveFilterLabel } from '../../../../../shared/workspace-view/workspace-row-filters'
import { FilterToggleRow } from '../../sidebar/FilterToggleRow'
import { OptionsFilterCountBadge } from '../../sidebar/options-filter-count-badge'
import {
  getPRCommentsListDisplayModeLabel,
  PR_COMMENT_LIST_DISPLAY_MODES,
  type PRCommentsListDisplayMode
} from './use-comments-list-state'

export function PRCommentOptionsMenu({
  displayMode,
  hideResolved,
  onDisplayModeChange,
  onHideResolvedChange
}: {
  displayMode: PRCommentsListDisplayMode
  hideResolved: boolean
  onDisplayModeChange: (mode: PRCommentsListDisplayMode) => void
  onHideResolvedChange: (hide: boolean) => void
}): React.JSX.Element {
  const activeFilterCount = hideResolved ? 1 : 0
  const label =
    activeFilterCount > 0
      ? translate(
          'auto.components.right.sidebar.checks.panel.commentOptions.triggerActive',
          'Comment options ({{value0}})',
          { value0: formatActiveFilterLabel(activeFilterCount) }
        )
      : translate(
          'auto.components.right.sidebar.checks.panel.commentOptions.title',
          'Comment options'
        )
  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="relative"
              aria-label={label}
            >
              <SlidersHorizontal className="size-3 text-muted-foreground" />
              <OptionsFilterCountBadge count={activeFilterCount} />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={4}>
          {label}
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" side="bottom" sideOffset={6} className="w-60">
        <div className="px-2 pt-1.5 text-sm font-semibold text-foreground">
          {translate(
            'auto.components.right.sidebar.checks.panel.commentOptions.title',
            'Comment options'
          )}
        </div>
        <DropdownMenuLabel>
          {translate('auto.components.right.sidebar.checks.panel.content.5e6e5a13fa', 'View')}
        </DropdownMenuLabel>
        <div className="px-2 pt-0.5 pb-1">
          <ToggleGroup
            type="single"
            value={displayMode}
            onValueChange={(value) => {
              const next = PR_COMMENT_LIST_DISPLAY_MODES.find((mode) => mode === value)
              if (next) {
                onDisplayModeChange(next)
              }
            }}
            variant="segmented"
            size="xs"
            spacing={1}
            className="w-full"
          >
            {PR_COMMENT_LIST_DISPLAY_MODES.map((mode) => (
              <ToggleGroupItem
                key={mode}
                value={mode}
                // Capture pointer intent before Radix roving focus can consume the click (see SidebarGroupByToggle).
                onPointerDownCapture={() => onDisplayModeChange(mode)}
                className="grow basis-0"
              >
                {getPRCommentsListDisplayModeLabel(mode)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-[11px] font-semibold text-muted-foreground">
            {translate(
              'auto.components.sidebar.SidebarWorkspaceFilterSection.82594419ba',
              'Filters'
            )}
          </span>
        </div>
        <FilterToggleRow
          icon={<CircleCheck className="size-3.5" />}
          label={translate(
            'auto.components.right.sidebar.checks.panel.commentOptions.hideResolved',
            'Hide resolved threads'
          )}
          checked={hideResolved}
          onChange={onHideResolvedChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
