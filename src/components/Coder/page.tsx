import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, Popconfirm, Switch, Table, Typography } from 'antd';
import { Item } from '../../services/ov/pos';
import { setIndentCfg, useIndentCfgStore } from '../../stores/indentsStore';
import CodeBlock from './codes';




interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text' | 'boolean';
    record: Item;
    index: number | string;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    // record,
    // index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'boolean' ? <Switch /> : <Input />;
    if (dataIndex === "name") {
        return (
            <td {...restProps}>
                {children}
            </td>
        )
    }
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


// import React from 'react';
// import styled from 'styled-components';


// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion


interface Props {
    onCompete?: (data: Item[]) => void;
}

/**
 * 
 */
const CoderFeildList: React.FC<Props> = () => {
    const [form] = Form.useForm();

    const data = useIndentCfgStore((state) => state.list)
    const genCode = useIndentCfgStore((state) => state.code)
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: Item) => {
        return record.key === editingKey
    };

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', param: false, rename: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setIndentCfg(newData)
                setEditingKey('');
            } else {
                newData.push(row);
                setIndentCfg(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'param',
            dataIndex: 'param',
            width: '15%',
            editable: true,
            render: (text: boolean) => {
                return <Switch checked={text} />
            }
        },
        {
            title: 'rename',
            dataIndex: 'rename',
            width: '40%',
            editable: true,

        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: unknown, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns: TableProps['columns'] = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'param' ? 'boolean' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
            <CodeBlock code={genCode} language={'go'} />

        </>
    );
}


// #endregion

export default CoderFeildList;