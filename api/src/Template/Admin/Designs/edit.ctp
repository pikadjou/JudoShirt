<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $design->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $design->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Designs'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Categories'), ['controller' => 'Categories', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Category'), ['controller' => 'Categories', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Tags'), ['controller' => 'Tags', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Tag'), ['controller' => 'Tags', 'action' => 'add']) ?></li>
    </ul>
</div>
<div class="designs form large-10 medium-9 columns">
    <?= $this->Form->create($design) ?>
    <fieldset>
        <legend><?= __('Edit Design') ?></legend>
        <?php
            echo $this->Form->input('name');
            echo $this->Form->input('content');
            echo $this->Form->input('thumbnail');
            echo $this->Form->input('header');
            echo $this->Form->input('shopId');
            echo $this->Form->input('idCustomShop');
            echo $this->Form->input('categories._ids', ['options' => $categories]);
            echo $this->Form->input('tags._ids', ['options' => $tags]);
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
