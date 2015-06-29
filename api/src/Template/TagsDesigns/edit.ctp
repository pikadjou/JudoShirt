<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $tagsDesign->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $tagsDesign->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Tags Designs'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Designs'), ['controller' => 'Designs', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Design'), ['controller' => 'Designs', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Tags'), ['controller' => 'Tags', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Tag'), ['controller' => 'Tags', 'action' => 'add']) ?></li>
    </ul>
</div>
<div class="tagsDesigns form large-10 medium-9 columns">
    <?= $this->Form->create($tagsDesign) ?>
    <fieldset>
        <legend><?= __('Edit Tags Design') ?></legend>
        <?php
            echo $this->Form->input('tagsId');
            echo $this->Form->input('designsId');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
