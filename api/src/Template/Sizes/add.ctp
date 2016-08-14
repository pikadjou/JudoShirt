<div class="sizes form">
    <?= $this->Form->create($size) ?>
    <fieldset>
        <legend><?= __('Add Size') ?></legend>
        <?php
        echo $this->Form->input('name');
        echo $this->Form->input('height');
        echo $this->Form->input('width');
        echo $this->Form->input('shopId');         ?>
    </fieldset>
    <?= $this->Form->button(__('Submit'), ['class' => 'btn btn-success']) ?>
    <?= $this->Html->link('Cancel', ['action' => 'index'], ['class' => 'btn btn-default'])?>
    <?= $this->Form->end() ?>
</div>
