global.console.log = jest.fn();
import '@/index';

describe('Index', () => {
  it('logs hello', () => {
    expect(console.log).toHaveBeenCalledWith('hello word');
  });
});
