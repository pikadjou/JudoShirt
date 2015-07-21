<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit Config'), ['action' => 'edit', $config->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Config'), ['action' => 'delete', $config->id], ['confirm' => __('Are you sure you want to delete # {0}?', $config->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Configs'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Config'), ['action' => 'add']) ?> </li>
    </ul>
</div>
<div class="configs view large-10 medium-9 columns">
    <h2><?= h($config->name) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('Name') ?></h6>
            <p><?= h($config->name) ?></p>
            <h6 class="subheader"><?= __('Value') ?></h6>
            <p><?= h($config->value) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($config->id) ?></p>
        </div>
    </div>
</div>
