<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit Tags Design'), ['action' => 'edit', $tagsDesign->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Tags Design'), ['action' => 'delete', $tagsDesign->id], ['confirm' => __('Are you sure you want to delete # {0}?', $tagsDesign->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Tags Designs'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Tags Design'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Designs'), ['controller' => 'Designs', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Design'), ['controller' => 'Designs', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Tags'), ['controller' => 'Tags', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Tag'), ['controller' => 'Tags', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="tagsDesigns view large-10 medium-9 columns">
    <h2><?= h($tagsDesign->id) ?></h2>
    <div class="row">
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($tagsDesign->id) ?></p>
            <h6 class="subheader"><?= __('TagsId') ?></h6>
            <p><?= $this->Number->format($tagsDesign->tagsId) ?></p>
            <h6 class="subheader"><?= __('DesignsId') ?></h6>
            <p><?= $this->Number->format($tagsDesign->designsId) ?></p>
        </div>
    </div>
</div>
